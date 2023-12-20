import { IsNotEmpty, IsString } from 'class-validator';

export class updateInfoDto {
    // @IsString()
    // @IsNotEmpty()
    // username: string;

    @IsString()
    role: string;

    @IsString()
    status: string;
}
