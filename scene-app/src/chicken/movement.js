import {TweenLite, Sine} from "gsap/all";
import styles from './chicken.module.scss';

const speed = 80;

function getAnimation(element, destinationLeft, destinationTop) {
    const onComplete = () => {
        element.classList.add(styles.standing);
        element.classList.remove(styles.moving);
    };
    if (destinationLeft - 5 < 0) {
        destinationLeft = 5;
    }
    if (destinationTop - 5 < 0) {
        destinationTop = 5;
    }
    if (destinationLeft > window.screen.width - 5) {
        destinationLeft = window.screen.width - 5;
    }
    if (destinationTop > window.screen.height - 5) {
        destinationTop = window.screen.height - 5;
    }
    return {
        left: destinationLeft, top: destinationTop, onComplete,
        ease: Sine.easeout
    }
}

function getDuration(element, destinationLeft, destinationTop) {

    const rect = element.getBoundingClientRect();
    const originalLeft = rect.left;
    const originalTop = rect.top;
    let resultLeft = destinationLeft - originalLeft;
    let resultTop = destinationTop - originalTop;
    const hip = Math.sqrt((resultLeft * resultLeft) + (resultTop * resultTop));
    console.log('duration: ', hip / speed);
    return hip / speed;
}

function shouldFlip(element, destinationLeft) {
    const originalLeft = element.getBoundingClientRect().left;
    return ( originalLeft - destinationLeft < 0)
}

function handleMovement(element, options) {
    const {x, y, autoFlip, shiftX, shiftY} = options;
    const rect = element.getBoundingClientRect();
    const destinationLeft = (x / 10) * (window.screen.width - rect.width - (shiftX || 0));
    const destinationTop = (y / 10) * (window.screen.height - rect.height + (shiftY || 0));
    TweenLite.to(element, getDuration(element, destinationLeft, destinationTop), getAnimation(element, destinationLeft + (shiftX || 0), destinationTop + (shiftY || 0)));
    element.classList.add(styles.moving);
    element.classList.remove(styles.standing);
    if (autoFlip && shouldFlip(element, destinationLeft)) {
        element.classList.add(styles.flipped);
    } else {
        element.classList.remove(styles.flipped);
    }
}

export default handleMovement;
