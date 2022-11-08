import BaseEntity from 'src/database/entities/abstract-entity';
export default class Photo extends BaseEntity {
    filename: string;
    data: Uint8Array;
}
