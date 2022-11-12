CREATE TABLE tasks-list (
    id SERIAL,
    taskName varchar(64),
    taskDetails varchar(128),
    complete BOOLEAN NOT NULL,
    compDate date 
);

INSERT INTO "tasks-list"
    ("taskName","taskDetails","complete","compDate")
VALUES
    ('New Fridge','Purchase and install new fridge, haul away old one.', 'FALSE', NULL),
    ('Rake Leaves','Rake & bag leaves. Take them to compost.', 'FALSE', NULL),
    ('Feed Cat','Wet food for the kitty!', 'FALSE', NULL),
    ('New Tires','Purchase new tires and setup installment appointment.', 'FALSE', NULL),
    ('Finish Weekend Project','ALL THE CODE, ALL THE COMMITS! GIT GOOD NEWB!', 'FALSE', NULL),
    ('Watch the Vikings win!', 'Tune in as the Vikings & Bills battle it out.', 'FALSE', NULL);