import { Controller, Get } from '@nestjs/common';
import { Reference } from '../reference.entity';
import { ReferenceService } from '../reference.service';


@Controller('reference')
export class ReferenceController {
    constructor(private referenceService: ReferenceService){}


    @Get()
    index(): Promise<Reference[]> {
      return this.referenceService.findAll();
    } 

}
