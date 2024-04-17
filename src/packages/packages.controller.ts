import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Request } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PackageEntity } from './entities/package.entity';

@Controller('packages')
@ApiTags('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) { }

  @Post()
  @ApiCreatedResponse({ type: PackageEntity })
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.create(createPackageDto);
  }

  @Get()
  @ApiOkResponse({ type: PackageEntity, isArray: true })
  findAll(
    @Query("take") take: string,
    @Query("page") page: string,
  ) {
    // console.log(page, take);
    return this.packagesService.searchUser(
      +page, +take
    );
  }


  @Get(':id')
  @ApiOkResponse({ type: PackageEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PackageEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packagesService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: PackageEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.packagesService.remove(+id);
  }
}
