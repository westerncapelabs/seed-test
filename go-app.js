// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

go.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var GoApp = go.app.GoApp;


    return {
        im: new InteractionMachine(api, new GoApp())
    };
}();

go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var FreeText = vumigo.states.FreeText;

    var GoApp = App.extend(function(self) {
        App.call(self, "state_start");
        var $ = self.$;
        var voice_enabled;

        self.init = function() {
            voice_enabled = self.im.config.voice_enabled;
        };

        self.states.add("state_start", function(name, voice_enabled) {
            return new ChoiceState(name, {
                question: $("What do you want to do?"),
                helper_metadata: {
                    speech_url: self.im.config.services.voice_content.url + name + ".mp3",
                    wait_for: '#',
                },
                choices: [
                    new Choice('state_text', $("Continue")),
                    new Choice('state_end', $("Exit"))
                ],
                next: function(choice) {
                    return {
                        name: choice.value,
                        creator_opts: voice_enabled
                    };
                }
            });
        });

        self.states.add("state_text", function(name, voice_enabled) {
            return new FreeText(name, {
                question: $("Yep, that's how it goes :)"),
                helper_metadata: {
                    speech_url: self.im.config.services.voice_content.url + name + ".mp3",
                    wait_for: '#',
                },
                next: {
                    name: "state_end",
                    creator_opts: voice_enabled
                }
            });
        });

        self.states.add("state_end", function(name, voice_enabled) {
            return new EndState(name, {
                text: $("This is the end of the line"),
                helper_metadata: {
                    speech_url: self.im.config.services.voice_content.url + name + ".mp3",
                    wait_for: '#',
                },
                next: "state_start"
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
