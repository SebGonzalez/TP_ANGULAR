import { Controller, Get, Query } from '@nestjs/common';
import { Post, Put, Delete, Body, Param } from  '@nestjs/common';
import { User } from '../users.entity';
import { UsersService } from '../users.service';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    // @Get()
    // index(): Promise<User[]> {
    //   return this.usersService.findAll();
    // }  

    @Get()
    find(@Query() query) {
      if(query.mail == undefined){
        return this.usersService.findAll();
      }
      return this.usersService.findByEmail(query.mail);
    }

    @Post()
    async create(@Body() userData: User): Promise<any> {
      return this.usersService.create(userData);
    }  

    @Put(':id')
    async update(@Param('id') id, @Body() userData: User): Promise<any> {
        userData.id = Number(id);
        console.log('Update #' + userData.id)
        return this.usersService.update(userData);
    } 

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.usersService.delete(id);
    } 

}