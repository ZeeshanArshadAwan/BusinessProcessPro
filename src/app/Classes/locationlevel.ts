export class Locationlevel {
    LocationLevelId: number;
    FK_CompanyId: number;
    LevelName: string;
    LevelArabicName: string;
    CompanyName: string;
    DeleteLevelsstring: string;
    selected: boolean = false;
    constructor() {
        this.LocationLevelId = 0;
        this.FK_CompanyId = 0;
        this.LevelName = '';
        this.LevelArabicName = '';
        this.CompanyName = '';
        this.DeleteLevelsstring = '';
        this.selected = false;
    }
}
