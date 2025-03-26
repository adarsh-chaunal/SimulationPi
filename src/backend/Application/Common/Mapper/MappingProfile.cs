using Application.Common.Dtos;
using AutoMapper;
using Domain.Entities;
using File = Domain.Entities.File;

namespace Application.Common.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Plot, PlotDto>()
            .ForMember(destinationMember => destinationMember.FileID,
                option => option.MapFrom(sourceMember =>
                    sourceMember.Plot_FileID ?? 0))
            .ForMember(destinationMember => destinationMember.File,
                option => option.MapFrom(sourceMember =>
                    sourceMember.Plot_File))
            .ReverseMap()
            .ForMember(destinationMember => destinationMember.UniqueID,
                option => option.MapFrom(sourceMember =>
                    string.IsNullOrWhiteSpace(sourceMember.UniqueID)
                    ? Guid.NewGuid().ToString()
                    : sourceMember.UniqueID))
            .ForMember(destinationMember => destinationMember.Plot_FileID,
                option => option.MapFrom(sourceMember =>
                sourceMember.FileID))
            .ForMember(destinationMember => destinationMember.Plot_File,
                option => option.MapFrom(sourceMember =>
                    sourceMember.File));

        CreateMap<File, FileDto>()
            .ReverseMap()
            .ForMember(destinationMember => destinationMember.UniqueID,
                option => option.MapFrom(sourceMember =>
                    string.IsNullOrWhiteSpace(sourceMember.UniqueID)
                    ? Guid.NewGuid().ToString()
                    : sourceMember.UniqueID));
    }
}