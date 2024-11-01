$(function() {
    function init() {
        initCache();
        initEvents();
        initView();
    }

    function initCache() {
        this.$body = $('body');
        this.$title = $('#title');

        this.form = $('#form')[0];
    }

    function initEvents() {
        this.$body.on('keyup', onKeyup.bind(this));
    }

    function TaskView() {
        const self = this;
        const tasks = getTasks();

        self.list = ko.observableArray(tasks);
        self.title = ko.observable();
        self.addItem = function() {
            const task = {
                id: self.list().length + 1,
                name: this.title(),
                done: false
            }

            addItem(this.title(), task, self.list);
            resetForm();
            setTasks(self.list())
        };
        self.removeItem = function (item) {
            removeItem(self.list, item);
            setTasks(self.list())
        };
        self.toggleCheck = function (item) {
            updateTask(self.list, item);
            setTasks(self.list())
        };
    }

    function initView() {
        const task = new TaskView();

        ko.applyBindings(task);
    }

    function resetForm() {
        this.form.reset();
        this.$title.blur();
    }

    function setTasks(items) {
        localStorage.setItem('tasks', JSON.stringify(items));
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    function onKeyup(event) {
        if (event.code === 'Enter' || event.keyCode === 13) resetForm();
    }

    function addItem(task, item, items) {
        if (!task) return;

        items.push(item);
    }

    function removeItem(items, item) {
        items.remove(item);
    }

    function updateTask(items, item) {
        const indexOf = items.indexOf(item);

        item.done = !item.done;
        items()[indexOf] = items.splice(indexOf, 1, ko.observable(item))[0];
    }

    init();
});

