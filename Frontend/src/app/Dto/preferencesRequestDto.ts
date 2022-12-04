export interface PreferencesRequestDto {
    brands : Array<string>;
    models : Array<string> 
    bodies : Array<string> 
    years : Array<number> 
    counties : Array<string> 
    fuels : Array<string> 
    pollutions : Array<string>
    minKm : number;
    maxKm : number; 
}
