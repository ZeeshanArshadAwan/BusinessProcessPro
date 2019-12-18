export class NotificationType {
    SpecificTimeEmail: number;
    SpecificTimeSMS: number;
    AdditionalApprovalLevel: number;
    NotificationTypeId: number;
    CoordinatorType: string;
    NotificationPolicy: string;
    TypeNameEn: string;
    TypeNameAr: string;
    EmailNotificationTemplateEn: string;
    EmailNotificationTemplateAr: string;
    SMSNotificationTemplateEn: string;
    SMSNotificationTemplateAr: string;
    SendToEmployee: boolean;
    HasEmail: boolean;
    HasSMS: boolean;
    SendReportToManager: boolean;
    SendToReportHR: boolean;
    SendReportToDeputy: boolean;
    IsSpecificTimeEmail: boolean;
    IsSpecificTimeSMS: boolean;
    SendReportToCoordinator: boolean;
}
export class NotifcationsTypesParameters {
    ParamId: number;
    NotificationTypeId: number;
    ParamNameEn: string;
    ParamNameAr: string;
    ParamEn: string;
    ParamAr: string;
}