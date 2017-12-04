/**
 * Created by amerlin on 04/12/17.
 */

const {Given,Then,When} = require ('cucumber');
Given(/^The sort contact list is display$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if ( err ) throw err ;
        var liste = this.browser.tabs.current.Contact.Contacts.instance();
        var tab= this.browser.queryAll('table tbody td');
        var i=liste.iterator();
        var j=0;
        while(i.hasNext()){
            var val=i.next();
            this.browser.assert.success(val.firstName(),tab[j].innerText);
            this.browser.assert.success(val.lastName(),tab[j+1].innerText);
            j+=6;
        }
        callback();
    });
});
When(/^User clicks on sort button$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;
        var bouton=this.browser.query('#button_sort');
        bouton.click();
        callback();
    });
});
Then(/^contact sort$/ , function (callback) {
    this.browser.visit ("http://127.0.0.1:3000",(err)=> {
        if(err) throw err ;
        var liste = this.browser.tabs.current.Contact.Contacts.instance();
        var i=liste.iterator();
        var ordre = [];
        var j=0;
        var k=0;

        while(i.hasNext()){
            var val=i.next();
            ordre.push(val.lastName());
        }
        ordre.sort();
        var i=liste.iterator();
        var tab=this.browser.queryAll ('table tbody td');
        while(i.hasNext()){
            var val=i.next();
            this.browser.assert.success(ordre[j],tab[k+1].innerText);
            j+=1;
            k+=6;
        }
        callback();
    });
});