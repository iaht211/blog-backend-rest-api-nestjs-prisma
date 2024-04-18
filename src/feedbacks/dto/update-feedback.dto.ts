import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
    title?: string;
    description?: string;
    staffId?: number;
}
