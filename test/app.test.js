var vumigo = require('vumigo_v02');
var AppTester = vumigo.AppTester;
var App = vumigo.App;
App.call(App);
var $ = App.$;

describe("Testing Infrastructure Stability App", function() {
    describe("", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();
            tester = new AppTester(app);

            tester
                .setup.char_limit(182)
                .setup.config.app({
                    name: 'connectivity-test',
                    //country_code: '234',  // nigeria
                    //channel: '*120*8864*0000#',
                    testing_today: '2016-05-31 06:07:08.999'
                });
        });

        describe("Flow", function() {
            it("to state_start", function() {

            });
            it("to state_text", function() {

            });
            it("to state_end", function() {

            });
        });
    });
});
