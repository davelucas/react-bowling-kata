export function simulatedBowl(pinState) {
  return new Promise(resolve => {
    setTimeout(function () {
      function staysUp() {
        return Math.random() > 0.7
      }

      function leftStanding(pins) {
        return pins.filter(p => p.up).length
      }

      let pinsLeftBeforeBowl = leftStanding(pinState)

      let pins = Array(10).fill().map((_, i) => {
          return {
            'position': i + 1,
            'up': pinState[i].up ? staysUp() : false
          }
        }
      )

      resolve({
        'pins': pins,
        'down': pinsLeftBeforeBowl - leftStanding(pins)
      })
    }, 500)
  })
}