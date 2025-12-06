import { Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { BaseService } from './baseService';
import { ApiResponse } from '@nestjs/swagger';

export abstract class BaseController<T, C, U, S extends BaseService<T, C, U>> {
  constructor(protected readonly service: S) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({
    status: 400,
    description: 'Body does not contain required fields',
  })
  create(@Body() createArtistDto: C) {
    return this.service.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Record is found' })
  @ApiResponse({ status: 400, description: 'Id is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: "Record with id doesn't exist" })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Id is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: "Record with id doesn't exist" })
  update(@Param('id') id: string, @Body() updateDto: U) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Deleted' })
  @ApiResponse({ status: 400, description: 'Id is invalid (not uuid)' })
  @ApiResponse({ status: 404, description: "Record with id doesn't exist" })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
