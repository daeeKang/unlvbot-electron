class UnlvClass {
    constructor(name, classes) {
        this.name = name;
        this.classes = new Map();
        this.initClasses(classes);
    }

    initClasses(cl) {
        cl.forEach(c => {
            let singleClass = new SingleClass(
                c.dayTime,
                c.room,
                c.sectionNumber,
                c.status,
                c.teacher
            );

            console.log(singleClass.days);
        });

        this.classes.set("M", []);
        this.classes.set("T", []);
        this.classes.set("W", []);
        this.classes.set("TH", []);
        this.classes.set("F", []);
    }
    getClassesOnDay(day) {
        return this.classes.get(day);
    }
    setClasses(cs) {
    }

    setName(name) {

    }
}

class SingleClass {
    constructor(dayTime, room, sectionNumber, status, teacher) {
        this.teacher = teacher;
        this.status = status;
        this.sectionNumber = sectionNumber;
        this.room = room;
        this.days = this.setDays(dayTime);
        this.startTime = this.setStartTime(dayTime);
    }

    setDays(dayTime) {
        let out = '';
        let findEnd = false;
        for (let i = 0; i < dayTime.length; i += 2) {
            if(findEnd) break;
            switch (dayTime[i]) {
                case 'M':
                    out += 'M';
                    break;
                case 'W':
                    out += 'W';
                    break;
                case 'F':
                    out += 'F';
                    break;
                case 'T':
                    if(dayTime[i + 1] == 'u')
                        out += 'T';
                    else
                        out += 'TH'; 
                    break;
                default:
                    findEnd = true;
                    break;
            }
        }

        return out;
    }

    //TODO: DO THIS TIME TINGZ
    setStartTime(dayTime) {
        let out = '';
        for(let i = 0; i < dayTime.length; i++){
            if(Number.isInteger(dayTime[i])){
                out = this.convertToMilitary(dayTime.substring(i, 7));
                return out;
            }
        }
    }

    convertToMilitary(time){
        if(time[5] == 'A') return time;
    }
}