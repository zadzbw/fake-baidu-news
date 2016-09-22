/**
 * Created by zad on 16/7/29.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.use('/download', (req, res, next)=> {
    res.header('Content-Type', 'application/octet-stream;charset=utf-8');
    next();
});

app.post('/auth', (req, res)=> {
    let {username, password} = req.body;
    if (username == 'admin' && password == 'admin') {
        return res.json({
            access_token: Math.random().toString(36).substring(7),
            refresh_token: Math.random().toString(36).substring(7)
        });
    } else {
        res.status(404).send({
            error: 'unauthorized'
        });
    }
});

app.get('/hot/news', (req, res)=> {
    res.send(
        {
            'data': [
                {
                    'title': '习近平：倡导清清爽爽的同志关系',
                    'query_word': '习近平：倡导清清爽爽的同志关系'
                },
                {
                    'title': '李克强对加拿大进行正式访问',
                    'query_word': '李克强对加拿大进行正式访问'
                },
                {
                    'title': '福原爱宣布已结婚',
                    'query_word': '福原爱[br]宣布已结婚'
                },
                {
                    'title': '最美野长城遭砂浆抹平',
                    'query_word': '最美野长城遭砂浆抹平'
                },
                {
                    'title': '20余省明确社会抚养费标准',
                    'query_word': '20余省份明确社会抚养费标准'
                },
                {
                    'title': '甘肃省信访局原局长被立案侦查',
                    'query_word': '甘肃省信访局原局长被立案侦查'
                },
                {
                    'title': '中药材制假售假严重',
                    'query_word': '中药材制假售假严重'
                },
                {
                    'title': '京津冀游将设＂黑名单＂',
                    'query_word': '京津冀游将设＂黑名单＂'
                },
                {
                    'title': '一次性买成都某楼盘60套房',
                    'query_word': '一次性买成都某楼盘60套房'
                },
                {
                    'title': '宝钢武钢重组获批',
                    'query_word': '宝钢武钢重组获批'
                },
                {
                    'title': '天宫二号发射成功',
                    'query_word': '天宫二号发射成功'
                },
                {
                    'title': '厦大校长巡校背影沉重',
                    'query_word': '厦大校长巡校背影沉重'
                },
                {
                    'title': '台风马勒卡接踵袭来',
                    'query_word': '台风马勒卡接踵袭来'
                },
                {
                    'title': '李嘉诚出手19亿港元',
                    'query_word': '李嘉诚出手19亿港元'
                },
                {
                    'title': '八达岭野生动物园恢复自驾游',
                    'query_word': '八达岭野生动物园恢复自驾游'
                },
                {
                    'title': '河北石家庄长寿村',
                    'query_word': '河北石家庄长寿村'
                },
                {
                    'title': '深圳快递规模首超北京',
                    'query_word': '深圳快递规模首超北京'
                },
                {
                    'title': 'iPhone 7今日发售',
                    'query_word': 'iPhone 7今日发售'
                },
                {
                    'title': '深圳房价全球第二贵',
                    'query_word': '深圳房价全球第二贵'
                },
                {
                    'title': '国足西安主场不变',
                    'query_word': '国足西安主场不变'
                },
                {
                    'title': '希拉里被曝隐瞒病情',
                    'query_word': '希拉里被曝隐瞒病情近20年'
                },
                {
                    'title': '山西公示省管干部',
                    'query_word': '山西集中公示70名省管干部'
                },
                {
                    'title': '2017全美大学排行榜',
                    'query_word': '2017全美大学排行榜'
                },
                {
                    'title': '最强台风登陆福建',
                    'query_word': '最强台风 “莫兰蒂” 福建 登陆'
                },
                {
                    'title': 'Note 7爆炸门',
                    'query_word': '三星 Note 7爆炸门'
                },
                {
                    'title': '福州充气月亮',
                    'query_word': '福州充气月亮'
                },
                {
                    'title': '三星Note7爆炸',
                    'query_word': '三星Note7爆炸'
                },
                {
                    'title': '台风莫兰蒂或登陆粤东',
                    'query_word': '台风莫兰蒂 登陆广东东部'
                },
                {
                    'title': '中国越南联合公告',
                    'query_word': '中国越南联合公告'
                },
                {
                    'title': '食堂推出“西红柿炒月饼”',
                    'query_word': '食堂推出“西红柿炒月饼”'
                }
            ]
        }
    );
});

app.listen(5000, ()=> {
    console.log('server has started!!!');
});