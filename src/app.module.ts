import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {PowerPlantsModule} from './power-plants/powerplants.module';

@Module({
  imports: [PowerPlantsModule],
  controllers: [AppController],
})
export class AppModule {}
