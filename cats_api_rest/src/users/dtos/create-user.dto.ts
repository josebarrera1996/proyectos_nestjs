import { IsString, IsEmail, Length, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(1, 500)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    rol?: string;
}
