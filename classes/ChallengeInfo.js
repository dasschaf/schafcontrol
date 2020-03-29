class CChallengeInfo
{
    /**
     * Creates a fully fledged ChallengeInfo object
     * @param {String} uid Unique Identifier of the Track
     * @param {String} name Track name with $-formatting
     * @param {String} filename Filename relative to the tracks directory
     * @param {String} author Track's author's login
     * @param {String} envi Track's environment
     * @param {String} mood Track's time of the day
     * @param {Number} btime Bronze Medal time in ms
     * @param {Number} stime Silver Medal time in ms
     * @param {Number} gtime Gold Medal time in ms
     * @param {Number} atime Author Medal time in ms
     * @param {Number} coppers Copper weight of the track
     * @param {Number} nlaps Number of laps, might be -1
     * @param {Number} ncp Number of Checkpoitns, might be -1
     */
    constructor(uid, name, filename, author, envi, mood, btime, stime, gtime, atime, coppers, nlaps, ncp)
    {
        this.uid = uid;
        this.name = name;
        this.filename = filename;
        this.author = author;
        this.envi = envi;
        this.mood = mood;

        this.medals =
        {
            author: atime,
            gold: gtime,
            silver: stime,
            bronze: btime
        };

        this.coppers = coppers;
        this.ncp = ncp;
        this.nlaps = nlaps;

    }

    static createFromStruct(struct)
    {
        let challengeObj = new CChallengeInfo(
            struct.UId,
            struct.Name,
            struct.FileName,
            struct.Author,
            struct.Environnement,
            struct.Mood,
            struct.BronzeTime,
            struct.SilverTime,
            struct.GoldTime,
            struct.AuthorTime,
            struct.CopperPrice,
            struct.NbLaps,
            struct.NbCheckpoints
        );

        return challengeObj;
    }

}