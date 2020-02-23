export class GeoSpatialMaps
    {
        GeoMapId: number;
        FK_ApplicationId: number;
        MapType: string;
        City: string;
        Sector: string;
        District: string;
        MapLayer: string;
        MapSize: string = '0';
        UploadedMap: string;
        CreatedDate: string;
        CreatedBy: string;
        LastUpdatedBy: string;
        LastUpdatedDate: string;
        selected:boolean;
    }