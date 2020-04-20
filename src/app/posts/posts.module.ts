import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        PostCreateComponent,
        PostListComponent,
    ], 
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ]
})
export class PostsModule {}