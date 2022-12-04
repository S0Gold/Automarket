using AutoMapper;
using AutoMarket.Dtos;
using AutoMarket.Models;

namespace AutoMarket.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserViewDto>().ReverseMap();

            CreateMap<Car, CarDto>().ReverseMap();
            CreateMap<Photo, PhotoDto>().ReverseMap();


            CreateMap<Announcement, AnnouncementAddDto>().ReverseMap()
                .ForMember(d => d.Options, opt => opt.MapFrom(src => string.Join(",", src.Options)))
                .ForMember(d => d.Location, opt => opt.MapFrom(src => src.County));

            CreateMap<AnnouncementViewDto, Announcement>().ReverseMap()
               .ForMember(d => d.Options, opt => opt.MapFrom(src => src.Options.Split(new char[] { ',' }).ToList()))
               .ForMember(d => d.CarId, opt => opt.MapFrom(src => src.Car.Id))
               .ForMember(d => d.Brand, opt => opt.MapFrom(src => src.Car.Brand))
               .ForMember(d => d.Model, opt => opt.MapFrom(src => src.Car.Model))
               .ForMember(d => d.Body, opt => opt.MapFrom(src => src.Car.Body))
               .ForMember(d => d.Year, opt => opt.MapFrom(src => src.Car.Year))
               .ForMember(d => d.Photos, opt => opt.MapFrom(src => src.Photos))
               .ForMember(d => d.County, opt => opt.MapFrom(src => src.Location));


            CreateMap<PreferencesDto, Preferences>()
                  .ForMember(d => d.Brands, opt => opt.MapFrom(src => string.Join(",", src.Brands)))
                  .ForMember(d => d.Models, opt => opt.MapFrom(src => string.Join(",", src.Models)))
                  .ForMember(d => d.Categories, opt => opt.MapFrom(src => string.Join(",", src.Bodies)))
                  .ForMember(d => d.Years, opt => opt.MapFrom(src => string.Join(",", src.Years)))
                  .ForMember(d => d.Counties, opt => opt.MapFrom(src => string.Join(",", src.Counties)));

            CreateMap<Preferences, PreferencesDto>()
                 .ForMember(d => d.Brands, opt => opt.MapFrom(src => src.Brands.Split(new char[] { ',' }).ToList()))
                 .ForMember(d => d.Models, opt => opt.MapFrom(src => src.Models.Split(new char[] { ',' }).ToList()))
                 .ForMember(d => d.Bodies, opt => opt.MapFrom(src => src.Categories.Split(new char[] { ',' }).ToList()))
                 .ForMember(d => d.Counties, opt => opt.MapFrom(src => src.Counties.Split(new char[] { ',' }).ToList()))
                 .ForMember(d => d.Years, opt => opt.MapFrom(src => src.Years.Split(new char[] { ',' }).Select(int.Parse).ToList() ));


            CreateMap<Announcement, PriceEstimation>().ReverseMap();
        }
    }
}
