/*jslint indent: 4, sloppy: true */
/*global React */

var setIntervalMixin = {
    componentWillMount: function () {
        this.intervals = [];
    },

    setInterval: function () {
        this.intervals.push(setInterval.apply(null, arguments));
    },

    componentWillUnmount: function () {
        this.intervals.map(clearInterval);
    }
};

var Counter = React.createClass({
    mixins: [setIntervalMixin],
    getInitialState: function() { return {value: 0 }; },

    tick: function () {
        this.setState({value: this.state.value + 1});
    },

    resetCounter: function () {
        console.log("Resetting counter to 0");
        sessionStorage.setItem('counterValue', 0);
        this.setState({value: 0});
    },

    statics: { label: "Counter" },

    componentDidMount: function () {
        var knownValue = sessionStorage.getItem('counterValue');
        this.setInterval(this.tick, 1000);
        if (knownValue) {
            console.log ("Loading last value ", knownValue);
            this.setState({value: Number(knownValue)});
        }
    },
    componentWillUnmount: function () { sessionStorage.setItem('counterValue', this.state.value); },

    render: function() {
        return React.DOM.div({},[
            React.DOM.h1({}, "Hello World, " + this.state.value),
            React.DOM.button({onClick: this.resetCounter}, "reset")
        ]);
    }
});

