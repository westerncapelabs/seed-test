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

        self.init = function() {};

        self.states.add("state_start", function() {
            return new ChoiceState(name, {
                question: "What do you want to do?",
                choices: [
                    new Choice('state_text', $("Continue")),
                    new Choice('state_end', $("Exit"))
                ],
                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add("state_text", function() {
            return new FreeText(name, {
                question: "Yep, that's how it goes :)",
                next: "state_end"
            });
        });

        self.states.add("state_end", function() {
            return new EndState(name, {
                text: "This is the end of the line",
                next: "state_start"
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
