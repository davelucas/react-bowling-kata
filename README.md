# React Bowling Kata

This project is intended for anyone using React with Redux who wants to improve their skills in a safe to fail environment.
Use it as a [practice drill](https://sites.google.com/site/steveyegge2/practicing-programming) in the spirit of [deliberate practice](http://jamesclear.com/beginners-guide-deliberate-practice)

## What to do?

Write [Jest](https://facebook.github.io/jest/docs/tutorial-react.html) tests in gameReducer.spec.js that check how the gameReducer modifies
the state of the game in response to actions. Complete the implementation of gameReducer.jsx to make failing tests pass one-by-one as you write them. There is an initial failing test to get you started.

Run the tests by typing `yarn test` on the command line. `yarn start` will build and run the code - you can visit http://localhost:3000/ to see it running

## Immutable

It's worth a mention that I've use the [Immutable.js](https://facebook.github.io/immutable-js/docs/#/) library in the application state to help enforce immutability.

## Uncle Bob's Version

The project was heavily inspired by [Uncle Bob's Bowling Game Kata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata). I recommend looking at Uncle Bob's kata for reference and inspiration for tests.

This version is slightly different mainly because we want to keep the cumulative score for each frame rather that just the total score at the end of the game.

## React App

This project was bootstrapped with the fabulous [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the Create react App guide along with some information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributions

There are issues which I haven't had time to sort out but hopefully they don't affect anyone's enjoyment of the kata. Or the usefulness - treat fixing these niggles as an extension of the problem. 

I welcome suggestions for how the structure of the react/redux code can be improved. The rendering of pretty much everything is fairly crude.

Pull requests are welcome.
