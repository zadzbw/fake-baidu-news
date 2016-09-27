/**
 * Created by zad on 16/9/27.
 */
/*
 * automate tag
 */
import {exec} from 'child_process';
import _debug from 'debug';

var log = _debug('news:release');

let tags = {};

exec('git push origin develop', (error, stdout, stderr) => {
    exec('git checkout master', (error, stdout, stderr) => {
        exec('git pull && git merge --no-ff develop', (error, stdout, stderr) => {
            exec('git push origin master', (error, stdout, stderr) => {
                log(1);
            });
        });
    });
});

