/**
 * Created by amerlin on 04/12/17.
 */

const { setWorldConstructor } = require('cucumber')
const Zombie =require('zombie');

class CustomWorld {
    constructor() {
        this.browser=new Zombie({site : 'http://127.0.0.1:3000'});
    }
}

setWorldConstructor(CustomWorld)