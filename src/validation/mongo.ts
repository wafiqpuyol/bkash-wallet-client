import { z } from 'zod';
import { IMonitorDocument, IMonitorErrorMessage } from '@/interfaces/monitor';

export const mongoSchema = z.object({
    name: z.string({ required_error: 'Display name is a required field.' }).min(2, { message: 'Display name is a required field.' }),
    url: z.string({ required_error: 'URL is a required field.' }).includes('mongodb'),
    notificationId: z.number({ required_error: 'Please select a notification group.' }).gt(0, 'Please select a notification group.'),
    alertThreshold: z
        .number({ required_error: 'Alert threshold must be a postive number.' })
        .gte(0, 'Alert threshold must be a postive number.')
});

export const mongoSchemaValidation = (monitorInfo: IMonitorDocument): IMonitorErrorMessage => {
    const errors: IMonitorErrorMessage = {};
    const result = mongoSchema.safeParse(monitorInfo);
    if (!result.success) {
        for (const item of result.error.issues) {
            errors[`${item.path[0]}`] = item.message;
        }
    }
    return errors;
};
