﻿// <auto-generated />
using System;
using AutoMarket.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AutoMarket.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220605125202_AddPreferences")]
    partial class AddPreferences
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AutoMarket.Models.Announcement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CarId")
                        .HasColumnType("int");

                    b.Property<decimal>("CilindricalCapacity")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Fuel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("HP")
                        .HasColumnType("int");

                    b.Property<int>("Km")
                        .HasColumnType("int");

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("Options")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pollution")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("VIN")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.ToTable("Announcements");
                });

            modelBuilder.Entity("AutoMarket.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("AutoMarket.Models.Photo", b =>
                {
                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AnnouncementId")
                        .HasColumnType("int");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPrimary")
                        .HasColumnType("bit");

                    b.HasKey("PublicId");

                    b.HasIndex("AnnouncementId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("AutoMarket.Models.Preferences", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Brands")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Categories")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Counties")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MaxPrice")
                        .HasColumnType("int");

                    b.Property<int>("MinPrice")
                        .HasColumnType("int");

                    b.Property<string>("Models")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("UsertId")
                        .HasColumnType("int");

                    b.Property<string>("Years")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Preferences");
                });

            modelBuilder.Entity("AutoMarket.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varchar(512)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varchar(512)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("varchar(25)");

                    b.Property<string>("VerificationCode")
                        .HasColumnType("varchar(256)");

                    b.Property<DateTime>("VerificationCodeTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AutoMarket.Models.UserAnnouncement", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("AnnouncementId")
                        .HasColumnType("int");

                    b.Property<bool>("IsFavorite")
                        .HasColumnType("bit");

                    b.Property<bool>("IsOwner")
                        .HasColumnType("bit");

                    b.Property<bool>("Seen")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "AnnouncementId");

                    b.HasIndex("AnnouncementId");

                    b.ToTable("UserAnnouncements");
                });

            modelBuilder.Entity("AutoMarket.Models.Announcement", b =>
                {
                    b.HasOne("AutoMarket.Models.Car", "Car")
                        .WithMany("Announcements")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Car");
                });

            modelBuilder.Entity("AutoMarket.Models.Photo", b =>
                {
                    b.HasOne("AutoMarket.Models.Announcement", "Announcement")
                        .WithMany("Photos")
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Announcement");
                });

            modelBuilder.Entity("AutoMarket.Models.Preferences", b =>
                {
                    b.HasOne("AutoMarket.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AutoMarket.Models.UserAnnouncement", b =>
                {
                    b.HasOne("AutoMarket.Models.Announcement", "Announcement")
                        .WithMany("Users")
                        .HasForeignKey("AnnouncementId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AutoMarket.Models.User", "User")
                        .WithMany("Announcements")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Announcement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AutoMarket.Models.Announcement", b =>
                {
                    b.Navigation("Photos");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("AutoMarket.Models.Car", b =>
                {
                    b.Navigation("Announcements");
                });

            modelBuilder.Entity("AutoMarket.Models.User", b =>
                {
                    b.Navigation("Announcements");
                });
#pragma warning restore 612, 618
        }
    }
}
