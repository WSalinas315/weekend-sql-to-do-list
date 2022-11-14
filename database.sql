CREATE TABLE tasks-list (
    id SERIAL,
    taskName varchar(64),
    taskDetails varchar(128),
    complete BOOLEAN NOT NULL
);

INSERT INTO "tasks-list"
    ("taskName","taskDetails","complete")
VALUES
    ('New Fridge','Purchase and install new fridge, haul away old one.', 'FALSE'),
    ('Rake Leaves','Rake & bag leaves. Take them to compost.', 'FALSE'),
    ('Feed Cat','Wet food for the kitty!', 'FALSE'),
    ('New Tires','Purchase new tires and setup installment appointment.', 'FALSE'),
    ('Finish Weekend Project','ALL THE CODE, ALL THE COMMITS! GIT GOOD NEWB!', 'FALSE'),
    ('Watch the Vikings win!', 'Tune in as the Vikings & Bills battle it out.', 'FALSE');