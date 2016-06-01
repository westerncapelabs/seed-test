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

        self.make_voice_helper_data = function(name) {
            if (voice_enabled) {
                return {
                    speech_url: self.im.config.state_audio[name],
                    wait_for: '#',
                };
            } else {
                return {};
            }
        };

        self.states.add("state_start", function(name) {
            return new ChoiceState(name, {
                question: $(self.im.config.state_prompts[name]),
                helper_metadata: {
                    voice: self.make_voice_helper_data(name)
                },
                choices: [
                    new Choice('state_text', $("Continue")),
                    new Choice('state_end', $("Exit"))
                ],
                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add("state_text", function(name) {
            return new FreeText(name, {
                question: $(self.im.config.state_prompts[name]),
                helper_metadata: {
                    voice: self.make_voice_helper_data(name)
                },
                next: "state_end"
            });
        });

        self.states.add("state_end", function(name) {
            return new EndState(name, {
                text: $(self.im.config.state_prompts[name]),
                helper_metadata: {
                    voice: self.make_voice_helper_data(name)
                },
                next: "state_start"
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
