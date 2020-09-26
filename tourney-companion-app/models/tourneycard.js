class TourneyCard {
    constructor(tid, url, tname, tgame, tplayers, ttype, tdate, pname, pid){
        this.tid = tid; //serves as primary key
        this.url = url; 
        this.tname = tname;
        this.tgame = tgame;
        this.tplayers = tplayers;
        this.ttype = ttype;
        this.tdate = tdate;
        this.pname = pname;
        this.pid = pid;
    }
}

export default TourneyCard;