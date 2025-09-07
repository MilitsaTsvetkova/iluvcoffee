import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}
  async onApplicationBootstrap() {
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ hello: 'world' }, contextId);
    const tagService = await this.moduleRef.resolve(TagsService, contextId);
    // const tagsService = await Promise.all([
    //   this.moduleRef.resolve(TagsService, contextId),
    //   this.moduleRef.resolve(TagsService, contextId),
    // ]);
    // console.log(tagsService[0] === tagsService[1]); // should log `false` if scope is REQUEST
    console.log(tagService);
  }
}
