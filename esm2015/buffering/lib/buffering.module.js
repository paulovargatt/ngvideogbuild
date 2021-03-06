import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgBufferingComponent } from './vg-buffering/vg-buffering.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
export class VgBufferingModule {
}
VgBufferingModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VgCoreModule],
                declarations: [VgBufferingComponent],
                exports: [VgBufferingComponent],
            },] }
];
//# sourceMappingURL=buffering.module.js.map