/**
 * Created by zad on 16/9/27.
 */
/*
 * automate tag
 */
import {exec} from 'child_process';
import _debug from 'debug';

var log = _debug('news:release');

exec('git push origin develop', () => {
    log('branch develop has been pushed');
    exec('git checkout master', () => {
        log('checkout to master');
        exec('git pull && git merge --no-ff develop', () => {
            log('pull branch master && merge --no-ff develop to master');
            exec('git push origin master', () => {
                log('branch master has been pushed');
                exec('git checkout develop', ()=> {
                    log('checkout to develop');
                    exec('git merge master', ()=> {
                        log('merge master to develop');
                    });
                });
            });
        });
    });
});

