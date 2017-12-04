/**
 * Created by amerlin on 04/12/17.
 */
 const {Given,When,Then} =require('cucumber');

Given(/^The contact list is display$/, function ( callback ) {
    this.browser.visit(" http://127.0.0.1:3000/" , ( err ) => {
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

When(/^User clicks on remove button of the first contact$/, function ( callback ) {
    this.browser.visit("http://127.0.0.1:3000/", ( err ) => {
        if (err) throw err;
        var tab= this.browser.queryAll('table tbody td a');
        tab[0].click();
        callback();
    });
});

Then(/^The first contact is removed$/, function ( callback ) {
    this.browser.visit("http://127.0.0.1:3000/", ( err ) => {
        if (err) throw err;
        var premier = this.browser.tabs.current.Contact.Contacts.instance().iterator().next();
        this.browser.assert.success(premier.firstName(),"Jacques");
        callback();
    });
});