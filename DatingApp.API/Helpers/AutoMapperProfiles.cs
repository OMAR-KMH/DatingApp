using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers {
    public class AutoMapperProfiles : Profile {

        public AutoMapperProfiles () {

            CreateMap<UserForUpdate, User> ();
            CreateMap<User, UserForListDto> ()
                .ForMember (dis => dis.PhotoUrl, opt => {

                    opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url);
                }).ForMember (dis => dis.Age, opt => {

                    opt.ResolveUsing (d => d.DateOfBirdth.CalculateAge ());
                });

            CreateMap<User, UserForDetailedDto> ().ForMember (dis => dis.PhotoUrl, opt => {

                opt.MapFrom (src => src.Photos.FirstOrDefault (p => p.IsMain).Url);
            }).ForMember (dis => dis.Age, opt => {

                opt.ResolveUsing (d => d.DateOfBirdth.CalculateAge ());
            });

            CreateMap<Photo, PhotosForDetaliedDto> ();
            CreateMap<Photo, PhotoForReturnDto> ();
            CreateMap<PhotoForCreationDto, Photo> ();
            CreateMap<UserToRegisterDto,User>();

            // CreateMap<UserForUpdate, UserForDetailedDto> ();

        }

    }
}