const simulatedBowl = pinState =>
  new Promise((resolve) => {
    setTimeout(() => {
      function staysUp() {
        return Math.random() > 0.7;
      }

      function leftStanding(pins) {
        return pins.filter(p => p.up).length;
      }

      const pinsLeftBeforeBowl = leftStanding(pinState);

      const pins = Array(10).fill().map((_, i) =>
        ({
          position: i + 1,
          up: pinState[i].up ? staysUp() : false,
        }),
      );

      resolve({
        pins,
        down: pinsLeftBeforeBowl - leftStanding(pins),
      });
    }, 500);
  });

export default simulatedBowl;

