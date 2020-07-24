const express = require('express')
const app = express(); // express사용 선언
const port = 5000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')

const {auth}=require('./middleware/auth')
const cookieParser = require('cookie-parser')

//applactation
app.use(bodyParser.urlencoded({extended: true}));

//applaction jsonq 분석해서 가져옴
app.use(bodyParser.json())
app.use(cookieParser());

mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false     //이걸 해야 오류가 안난다고한다.
    })
    .then(() => console.log("connect..............."))
    .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/hello',(req,res)=>
{
    res.send("안녕하세요 요청받아 연결되었습니다 .")
})


app.post('/api/users/register', (req, res) => {
    //회원가입할떄 필요정보 client 에서가져오면
    //그것들을 DB에 넣기
    const user = new User(req.body)   //body에는 정보가 있다 id pass word

    user.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({       //status 이거느 성공했다는 의미이다.
            success: true
        })
    })

})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일 db에 찾음
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "이메이에 해당 유저 x"

            })
        }
        //요청된 이메일이 db에있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({loginSuccess: false, message: "비밀번호가틀렸습니다."})

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰저장  -> 쿠키나 로컬스토리지 어디든 가능,

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
                //쿠키에
            })
        })
    })
})

//auth route
app.get('/api/users/auth', auth ,(req,res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        name: req.user.name,
        studentID: req.user.studentID,
        userID: req.user.userID,
        role: req.user.role,
    })
})

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({ _id: req.user._id},
        {token: ""},
        (err, user) => {
            if(err) return res.json({ success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})
//비밀번호 까지 맞다면 토큰 생성하
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

