<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>百度新闻</title>
</head>
<body>
<div id="wrap"></div>
<script type="text/javascript">
    (function () {
        var cssEl = document.createElement('style');
        document.documentElement.firstElementChild.appendChild(cssEl);
        var dpr = 1;
        //把viewport分成10份的rem，html标签的font-size设置为1rem的大小;
        var pxPerRem = document.documentElement.clientWidth * dpr / 10;
        cssEl.innerHTML = 'html{font-size:' + pxPerRem + 'px!important;}';
    })();
</script>
</body>
</html>
