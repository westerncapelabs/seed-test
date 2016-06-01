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
                    testing_today: '2016-05-31 06:07:08.999',
                    voice_enabled: true,  // default
                    services: {
                        voice_content: {
                            api_token: 'test_token_voice',
                            url: "http://localhost:8001/api/v1/"
                        }
                    }
                });
        });

        describe("Flow", function() {
            it("to state_start", function() {
                return tester
                    .setup.user.addr('0820000000')
                    .inputs(
                        {session_event: 'new'}
                    )
                    .check.interaction({
                        state: "state_start",
                        reply: [
                            "What do you want to do?",
                            "1. Continue",
                            "2. Exit"
                        ].join('\n')
                    })
                    .check.reply.properties({
                        helper_metadata: {
                            voice: {
                                speech_url: 'http://localhost:8001/api/v1/state_start.mp3',
                                wait_for: '#'
                            }
                        }
                    })
                    .run()
            });
            it("to state_text", function() {
                return tester
                    .setup.user.addr('0820000000')
                    .inputs(
                        {session_event: 'new'}
                        , "1"  // state_start - continue
                    )
                    .check.interaction({
                        state: "state_text",
                        reply: "Yep, that's how it goes :)"
                    })
                    .check.reply.properties({
                        helper_metadata: {
                            voice: {
                                speech_url: 'http://localhost:8001/api/v1/state_text.mp3',
                                wait_for: '#'
                            }
                        }
                    })
                    .run()
            });
            it("to state_end", function() {
                return tester
                    .setup.user.addr('0820000000')
                    .inputs(
                        {session_event: 'new'}
                        , "1"  // state_start - continue
                        , "blah"  // state_text
                    )
                    .check.interaction({
                        state: "state_end",
                        reply: "This is the end of the line"
                    })
                    .check.reply.properties({
                        helper_metadata: {
                            voice: {
                                speech_url: 'http://localhost:8001/api/v1/state_end.mp3',
                                wait_for: '#'
                            }
                        }
                    })
                    .run()
            });
            it("to state_end (via state_start)", function() {
                return tester
                    .setup.user.addr('0820000000')
                    .inputs(
                        {session_event: 'new'}
                        , "2"  // state_start - exit
                    )
                    .check.interaction({
                        state: "state_end",
                        reply: "This is the end of the line"
                    })
                    .check.reply.properties({
                        helper_metadata: {
                            voice: {
                                speech_url: 'http://localhost:8001/api/v1/state_end.mp3',
                                wait_for: '#'
                            }
                        }
                    })
                    .run()
            });
        });
    });
});
