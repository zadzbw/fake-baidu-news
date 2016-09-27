/**
 * Created by zad on 16/9/27.
 */
/*
 * automate tag
 */
import {exec} from 'child_process';
import _debug from 'debug';
import {version} from '../package.json';

var log = _debug('news:release');

let tags = {};

exec('ggpush', (error, stdout, stderr) => {
    exec('git checkout master', (error, stdout, stderr) => {
        exec('ggpull && git merge --no-ff develop', (error, stdout, stderr) => {
        });
    });
});

