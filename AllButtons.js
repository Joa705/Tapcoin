

    //Buttons list 
    const allButtons = () => {
        const ButtonList = [
            {
            id: '0',
            name: require('./ButtonImage/pixilart-drawing.png'),
            width: 150,
            height: 150,
            owned: true,
            },
            {id: '1',
            name: require('./ButtonImage/CoolButton.png'),
            width: 150,
            height: 150,
            price: 500,
            owned: false,
             },
            {id: '2',
            name: require('./ButtonImage/LongBlueButton.png'),
            width: 300,
            height: 150,
            price: 1000,
            owned: false,
            },
            {id: '3',
            name: require('./ButtonImage/RedPlayButton.png'),
            width: 150,
            height: 150,
            price: 1500,
            owned: false,
            },
            {id: '4',
            name: require('./ButtonImage/BlackButton.png'),
            width: 150,
            height: 150,
            price: 1500,
            owned: false,
            },
            {id: '5',
            name: require('./ButtonImage/BlueButton.png'),
            width: 150,
            height: 150,
            price: 1500,
            owned: false,
            },
        ]; 

        return(
            ButtonList
        )
    }

  


export default allButtons();
