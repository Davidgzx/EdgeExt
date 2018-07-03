function Mode() {
    let mode = 'normal';
    let subMode = 'default';
    this.changeMode = function (newMode) {
        mode = newMode;
        this.changePopUp();
    };
    this.changeSubMode = function (newSubMode) {
        subMode = newSubMode;
        this.changePopUp();
    };
    this.getMode = function () {
        return mode;
    };
    this.getSubMode = function () {
        return subMode;
    };

    this.changePopUp = function () {
        try {
            clearTimeout(popup);
        } catch (error) {};
        $('#mode').remove();
        let popUp = document.createElement('div');
        popUp.innerHTML = '<div id=\'modePop\'>' + 'Mode: ' +
            mode + '</div>' + '<div id=\'subModePop\'>' + subMode + '</div>';
        popUp.id = 'mode';
        document.body.appendChild(popUp);
        popup = setTimeout(function () {
            $('#mode').remove();
        }, 1000);
    };
}