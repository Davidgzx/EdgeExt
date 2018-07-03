function Mode() {
    this.mode = 'normal';
    this.subMode = 'default';
    this.changeMode = function (newMode) {
        this.mode = newMode;
        this.changePopUp();
    };
    this.changeSubMode = function (newSubMode) {
        this.subMode = newSubMode;
        this.changePopUp();
    };
    this.getMode = function () {
        return this.mode;
    };
    this.getSubMode = function () {
        return this.subMode;
    };

    this.changePopUp = function () {
        try {
            clearTimeout(popup);
        } catch (error) {};
        $('#mode').remove();
        let popUp = document.createElement('div');
        popUp.innerHTML = '<div id=\'modePop\'>' + 'Mode: ' +
            this.mode + '</div>' + '<div id=\'subModePop\'>' + this.subMode + '</div>';
        popUp.id = 'mode';
        document.body.appendChild(popUp);
        popup = setTimeout(function () {
            $('#mode').remove();
        }, 1000);
    };
}