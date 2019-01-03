export { BackgroundUI };

class BackgroundUI {
    constructor(engine) {
        engine.add(new FillRoundRect(10, 10, 780, 430, 30, "black"));
    }
}
