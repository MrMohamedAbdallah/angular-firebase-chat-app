import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
    {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class RoutingModule{

}