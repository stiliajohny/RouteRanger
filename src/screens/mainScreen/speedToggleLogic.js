// speedToggleLogic.js
export const SPEED_UNITS = ['mph', 'kph', 'm/s']

export const convertSpeed = (speed, unit) => {
        switch (unit) {
                case 'mph':
                        return speed * 2.23694
                case 'kph':
                        return speed * 3.6
                case 'm/s':
                        return speed
                default:
                        return speed
        }
}
